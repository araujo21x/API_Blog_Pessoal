class imgBodyModel {
    constructor(img) {
        this._imgBody = {
            name: img.originalname,
            size: img.size,
            key: img.key,
            url: img.location,
        }
    }

    get() {
        return this._imgBody
    }
}

module.exports = imgBodyModel;