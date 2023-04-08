import { google } from 'googleapis';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const factCheckApiClient = google.factchecktools({
    version: 'v1alpha1',
    auth: GOOGLE_API_KEY,
});

export default async function handler(req, res) {
    const { query } = req.query;

    const response = await factCheckApiClient.claims.search({query});

    const factChecks = response.data.claims;

    res.status(200).json(factChecks);
}