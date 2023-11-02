import mongoose from "mongoose";

const exchangeDataSchema = mongoose.Schema(
  {
    exchangeId: { type: String, unique: true },
    website: { type: String },
    name: { type: String },
    data_quote_start: { type: Date },
    data_quote_end: { type: Date },
    data_orderbook_start: { type: Date },
    data_orderbook_end: { type: Date },
    data_trade_start: { type: Date },
    data_trade_end: { type: Date },
    data_symbols_count: { type: Number },
    volume_1hrs_usd: { type: Number },
    volume_1day_usd: { type: Number },
    volume_1mth_usd: { type: Number },
    imageUrl: { type: String },
    metric_id: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("exchangedata", exchangeDataSchema);
