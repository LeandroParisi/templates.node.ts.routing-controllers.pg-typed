/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Server } from './Server/Server'

const app = new Server()
app.Start()
app.Run()
