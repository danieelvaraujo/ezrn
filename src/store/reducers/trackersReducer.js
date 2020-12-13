import { ADD_TRACKER, SET_TRACKERS } from "../actions/trackerActions";
import Tracker from "../../models/tracker";

const initialState = {
  trackers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKERS:
      return {
        trackers: action.trackers.map(
          (tr) => new Tracker(tr.id.toString(), tr.endereco, tr.lat, tr.lng)
        ),
      };
    case ADD_TRACKER:
      const novoTracker = new Tracker(
        action.trackerData.id.toString(),
        action.trackerData.endereco,
        action.trackerData.coords.lat,
        action.trackerData.coords.lng
      );
      return {
        trackers: state.trackers.concat(novoTracker),
      };
    default:
      return state;
  }
};
