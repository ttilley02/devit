const xss = require("xss");
const Treeize = require("treeize");

const OffersService = {
   getAllOffers(db) {
      return db.from("developit_offers as offers").select("*");
   },
   getByOfferId(db, id) {
      return OffersService.getAllOffers(db).where("offers.id", id);
   },
   getByDevId(db, devId) {
      return OffersService.getAllOffers(db).where("offers.dev_id", devId);
   },
   getByEmployerId(db, empId) {
      return OffersService.getAllOffers(db).where("offers.employer_id", empId);
   },
   serializeOffers(offers) {
      return offers.map(this.serializeOffer);
   },
   serializeOffer(offer) {
      const offerTree = new Treeize();

      const offerData = offerTree.grow([offer]).getData()[0];

      return {
         id: offerData.id,
         date_created: offerData.date_created,
         employer_id: offerData.employer_id,
         dev_id: offerData.dev_id,
         payrate: offerData.payrate,
         offer_info: xss(offerData.offer_info),
         offer_detail: xss(offerData.offer_detail),
         response: xss(offerData.response),
      };
   },
   createOffer(db, newOffer) {
      return db
         .insert(newOffer)
         .into("developit_offers")
         .returning("*")
         .then(([offer]) => offer)
         .then((offer) => OffersService.getByOfferId(db, offer.id));
   },
   deleteOffer(db, id) {
      return db
         .from("developit_offers")
         .where("developit_offers.id", id)
         .delete();
   },
   updateOfferDetails(db, id, newOfferDetails) {
      return db.from("developit_offers").where({ id }).update(newOfferDetails);
   },
   updateOfferResponse(db, id, offerResponse) {
      return db.from("developit_offers").where({ id }).update(offerResponse);
   },
};

module.exports = OffersService;
