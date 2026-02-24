import API from "../axios";

export const fetchCampaigns = () => API.get("/campaigns");
export const fetchAuditByCampaign = (campaignId) => API.get(`/audits/campaign/${campaignId}`);
export const createDonation = (payload) => API.post("/donations", payload);
export const fetchTransparencyStats = () => API.get("/stats/transparency");
