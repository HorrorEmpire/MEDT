import { exoplanetsModel } from "../../models/exoplanetsModel.js";

// Hilfe vom Herrn Geyser
export default function (exoplanetsService) {
    let operations = {
        GET: getById,
        PUT,
        DELETE
    };

    function getById(request, response, next) {
        const exoplanet = exoplanetsModel.exoplanets.find(x => x.id == request.params.id);
        if (exoplanet !== undefined) {
            response
                .status(200)
                .json(exoplanet);
        } else {
            response.sendStatus(404);
        }
    };

    function PUT(request, response, next) {
        const exoplanet = exoplanetsModel.exoplanets.find(x => x.id == request.body.id);

        if (exoplanet !== undefined) {
            exoplanet.planet_name = request.body.planet_name;
            exoplanet.hostname = request.body.hostname;
            exoplanet.planet_letter = request.body.planet_letter;


            exoplanetsService.put(exoplanet);
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    };

    function DELETE(request, response, next) {
        const exoplanet = exoplanetsModel.exoplanets.find(x => x.id == request.params.id);

        if (exoplanet !== undefined) {
            exoplanetsService.delete(request.params.id);
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    };

    getById.apiDoc = {
        summary: 'returns a single exoplanet by id.',
        operationId: 'getExoplanetById',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id of exoplanet to return.',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64'
                }
            }
        ],
        responses: {
            200: {
                description: 'an exoplanet with the given id.',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    },
                    'application/xml': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    }
                }
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    PUT.apiDoc = {
        summary: 'updates the exoplanet with the given id.',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/exoplanet'
                    }
                },
                'application/xml': {
                    schema: {
                        $ref: '#/components/schemas/exoplanet'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'put.'
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    DELETE.apiDoc = {
        summary: 'deletes the exoplanet with the given id.',
        operationId: 'deleteExoplanetById',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id.',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64'
                }
            }
        ],
        responses: {
            200: {
                description: 'deleted.'
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    return operations;
};