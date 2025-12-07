import mongoose from "mongoose";


const movieslistSchema = new mongoose.Schema({
    moviename: { type: String, required: true },
    language: { type: String, required: true },
    directorName: { type: String, required: true },
    poster: { type: String, required: true },
    video: { type: String, required: true },
    year: { type: Number },
    starring: { type: String },
    genres: { type: String },
    categories: { type: String },
    country: { type: String },
    description: { type: String },


});

export default mongoose.models.Movieslist ||
    mongoose.model("Movieslist", movieslistSchema, "movieslist");