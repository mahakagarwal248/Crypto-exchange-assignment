import axios from "axios";
import exchangesDataSchema from "../models/exchangesData.js";

export const storeData = async (req, res) => {
  const data = await axios
    .get(`https://rest.coinapi.io/v1/exchanges?apikey=${process.env.API_KEY}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log("🚀 ~ file: exchangeData.js:11 ~ storeData ~ err:", err);
      return err;
    });

  const imageUrls = await axios
    .get(
      `https://rest.coinapi.io/v1/exchanges/icons/32?apikey=${process.env.API_KEY}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log("🚀 ~ file: exchangeData.js:24 ~ storeData ~ err:", err);
      return err;
    });
  let finalDataSave = [];
  const existingData = await exchangesDataSchema
    .find({})
    .select("-_id -createdAt -updatedAt -__v");

  data.map((item) => {
    // if(existingData.includes(item.exchange_id))
    const foundData = existingData.find(
      (ele) => ele.exchangeId === item.exchange_id
    );
    if (!foundData) {
      const findUrl = imageUrls.find(
        (url) => url.exchange_id === item.exchange_id
      );
      const obj = {
        exchangeId: item.exchange_id,
        website: item.website,
        name: item.name,
        data_quote_start: item?.data_quote_start,
        data_quote_end: item?.data_quote_end,
        data_orderbook_start: item?.data_orderbook_start,
        data_orderbook_end: item?.data_orderbook_end,
        data_trade_start: item?.data_trade_start,
        data_trade_end: item?.data_trade_end,
        data_symbols_count: item?.data_symbols_count,
        volume_1hrs_usd: item?.volume_1hrs_usd,
        volume_1day_usd: item?.volume_1day_usd,
        volume_1mth_usd: item?.volume_1mth_usd,
        metric_id: item?.metric_id || "",
        imageUrl: findUrl?.url || "",
      };

      finalDataSave.push(obj);
    }
  });

  try {
    // await exchangesDataSchema.deleteMany({});
    const saveAllDoc = await exchangesDataSchema.insertMany(finalDataSave, {
      ordered: false,
    });
    return res.send(saveAllDoc);
  } catch (error) {
    console.log("🚀 ~ file: exchangeData.js:58 ~ storeData ~ error:", error);
    return error;
  }
};

export const getData = async (req, res) => {
  const {
    query: { pageNumber = 0, limit = 10, searchTerm },
  } = req;

  let query = {};
  if (searchTerm) {
    query = { ...query, exchangeId: { $regex: searchTerm, $options: "i" } };
  }

  try {
    const skip = pageNumber;
    const data = await exchangesDataSchema
      .find(query)
      .skip(skip * limit)
      .limit(limit);
    if (!data) return res.status(404).send({ message: "Data not found" });

    const totalCount = await exchangesDataSchema.countDocuments(query);
    return res.json({ data, totalCount });
  } catch (error) {
    return res.send(error);
  }
};
