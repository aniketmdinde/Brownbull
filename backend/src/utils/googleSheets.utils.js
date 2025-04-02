import { google } from "googleapis";
import credentials from "../../credentials.json" assert { type: "json" };

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1Wq71ughCZxx2t0JFx58x7WQwmZl3KomFmvhZVe7aK4k";

// Add shipment details to Google Sheets
export const addShipmentToSheet = (shipment) => {
    const values = [[
        shipment.name,
        shipment.client_company,
        shipment.pickup_location,
        shipment.drop_location,
        shipment.transport_mode,
        JSON.stringify(shipment.packages),
        shipment.shipment_date,
        shipment.status
    ]];

    sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:H",
        valueInputOption: "RAW",
        resource: { values },
    });
}

// Update shipment status in Google Sheets
export const updateShipmentInSheet = (rowIndex, status) => {
    sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!H${rowIndex + 1}`, // Status column (H)
        valueInputOption: "RAW",
        resource: { values: [[status]] },
    });
}