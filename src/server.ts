import './database'
import express, { } from 'express';
import swaggerUi from 'swagger-ui-express'

import swaggerFile from './swagger.json'

import './shared/container'

import { router } from './routes'

const app = express();

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.listen(3333, () => console.log('🔥 running on port 3333 🔥'));
