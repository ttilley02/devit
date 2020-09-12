const express = require("express");
const OffersService = require("./offers-service");
const { requireAuth } = require("../middleware/jwt-auth");

const offersRouter = express.Router();
const jsonBodyParser = express.json();
const database = req.app.get("db");

// post new offer to database
offersRouter
  .route("/")
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { dev_id, offer_detail } = req.body;
    const newOffer = { dev_id, offer_detail };

    if (newOffer.dev_id == null || newOffer.offer_detail == null) {
      return res.status(400).json({
        error: `Missing recipient or details in request body`,
      });
    }

    newOffer.employer_id = req.user.id;

    OffersService.createOffer(database, newOffer)
      .then((offer) => {
        res.status(201).json(offer);
      })
      .catch(next);
  });

// get all offers specific to dev/recipient
offersRouter
  .route("/dev")
  .all(requireAuth)
  .get((req, res, next) => {
    OffersService.getByDevId(database, req.user.id)
      .then((offers) => {
        res.status(200).json(OffersService.serializeOffers(offers));
      })
      .catch(next);
  });

// route for devs to create response to offer ..this patch only edits response
offersRouter
  .route("/dev/:offer_id")
  .all(requireAuth)
  .all(checkForOffer)
  .patch(jsonBodyParser, (req, res, next) => {
    const { response } = req.body;
    const newResponse = { response };

    if (newResponse.response == null) {
      return res.status(400).json({
        error: `Missing response`,
      });
    }

    OffersService.updateOfferResponse(
      database,
      req.params.offer_id,
      newResponse
    )
      .then((offer) => {
        res.status(204).end();
      })
      .catch(next);
  });

// route to get offer specific to employer/sender
offersRouter
  .route("/emp")
  .all(requireAuth)
  .get((req, res, next) => {
    OffersService.getByEmployerId(database, req.user.id)
      .then((offers) => {
        res.status(200).json(OffersService.serializeOffers(offers));
      })
      .catch(next);
  });

// get, delete & update offers by id
// can use offer id specific get or emp/dev endpoints
// intended for the delete & patch to only be used by employers ..this patch only edits offer details
offersRouter
  .route("/:offer_id")
  .all(requireAuth)
  .all(checkForOffer)
  .get((req, res, next) => {
    OffersService.getByOfferId(database, req.params.offer_id)
      .then((offer) => {
        res.status(200).json(OffersService.serializeOffer(offer));
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const id = req.params.offer_id;
    OffersService.deleteOffer(database, id)
      .then((report) => {
        res.status(200).json(report);
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { offer_detail } = req.body;
    const newOfferDetails = { offer_detail };

    if (newOfferDetails.offer_detail == null) {
      return res.status(400).json({
        error: `Missing offer details`,
      });
    }

    OffersService.updateOfferDetails(
      database,
      req.params.offer_id,
      newOfferDetails
    )
      .then((offer) => {
        res.status(204).end();
      })
      .catch(next);
  });

async function checkForOffer(req, res, next) {
  const id = req.params.offer_id;
  OffersService.getByOfferId(req.app.get("db"), id)
    .then((offer) => {
      if (!offer) {
        return res.status(404).json({
          error: { message: `Offer doesn't exist` },
        });
      }
      res.offer = offer;
      next();
    })
    .catch(next);
}

module.exports = offersRouter;
