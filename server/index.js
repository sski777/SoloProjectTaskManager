import express from 'express'
import cors from 'cors'
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
const server = express();


server.use(cors())


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

server.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

server.listen(8080, () => {
  console.log('The Server Is Running!')
})