export default function (exoplanetsService) {
    let operations = {
        GET: getExoplanets,
        POST
    };

    function getExoplanets(request, response, next) {
        response
            .status(200)
            .json(exoplanetsService.getExoplanets());
    };

    function POST(request, response, next) {
        exoplanetsService.post(request.body);
        response.sendStatus(201);
    };

    // NOTE: We could also use a YAML string here.
    getExoplanets.apiDoc = {
        summary: 'get all exoplanets.',
        operationId: 'getExoplanets',
        parameters: [],
        responses: {
            200: {
                description: '',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/exoplanet'
                            }
                        }
                    },
                    'application/xml': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/exoplanet'
                            }
                        }
                    }
                }
            },
            default: {
                description: 'An error occurred',
            }
        }
    };

    POST.apiDoc = {
        summary: 'create',
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
            201: {
                description: 'created entry'
            },
            default: {
                description: 'An error occurred.'
            }
        }
    };

    console.log(getExoplanets);

    return operations;
};