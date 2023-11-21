import {exoplanetsModel} from "../models/exoplanetsModel.js";

const exoplanetsService = {
    getExoplanets() {
        return exoplanetsModel;
    },
    post(exoplanet) {
        exoplanetsModel.exoplanets.push(exoplanet);   
    },
    put(exoplanet) {
        const index = exoplanetsModel.exoplanets.findIndex(x => x.id == exoplanet.id);
        if (index !== -1) {
            exoplanetsModel.exoplanets[index] = exoplanet;
        }
    },
    delete(id) {
        const index = exoplanetsModel.exoplanets.findIndex(x => x.id == id);
        if (index !== -1) {
            exoplanetsModel.exoplanets.splice(index, 1);
        }
    }
};

export default exoplanetsService;