import express from 'express'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import RouteTasks from './Routes/Tasks.js'
import RouteUpdates from './Routes/Update.js';
import RouteEdit from './Routes/Edit.js';
import RoutePriority from './Routes/Priority.js';
import RouteDetailsTimer from './Routes/DetailsTimer.js';
import RouteChangeDate from './Routes/ChangeDate.js';
import RouteSearch from './Routes/Search.js';
import RouteSetAll from './Routes/SetAll.js';
import RouteDeleteAll from './Routes/DeleteAll.js';
import RouteReverseAll from './Routes/ReverseAll.js';
import RouteChangePriorityId from './Routes/ChangePriorityId.js';
import RouteChangeStateId from './Routes/ChangeStateId.js';
import RouteSetFavoriteState from './Routes/SetFavoriteState.js';
import RouteReverseChanges from './Routes/ReturnChanges.js';
import RouteSetAllFavorites from './Routes/SetAllFavorites.js';
import RouteUpdateFavorite from './Routes/UpdateFavorite.js';
import RouteChangeSetCategory from './Routes/SetChangeCategory.js';
import RouteChangeHiddenState from './Routes/ChangeHiddenState.js';
import RouteChangeEmail from './Routes/AddEmail.js';
const server = express();


const allowedOrigins = ['https://flowmate-drab.vercel.app', 'http://localhost:3000'];

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

server.use(limiter); // add it as a middlewware function

server.use(helmet())

server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Optional: if you are using cookies or sessions
}));



server.use('/tasks', RouteTasks)

server.use('/updates', RouteUpdates)

server.use('/edit', RouteEdit)

server.use('/priority', RoutePriority)

server.use('/details', RouteDetailsTimer)

server.use('/extenddate', RouteChangeDate)

server.use('/search', RouteSearch)

server.use('/setall', RouteSetAll)

server.use('/deleteall', RouteDeleteAll)

server.use('/reverseall', RouteReverseAll)

server.use('/changeid', RouteChangePriorityId)

server.use('/changeidstate', RouteChangeStateId)

server.use('/changefavorite', RouteSetFavoriteState)

server.use('/returnchanges', RouteReverseChanges)

server.use('/setallfavorites', RouteSetAllFavorites)

server.use('/updatefavorite', RouteUpdateFavorite)

server.use('/changecategory', RouteChangeSetCategory)

server.use('/changehidden', RouteChangeHiddenState)

server.use('/addemail', RouteChangeEmail)

server.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('The Server Is Running!')
})