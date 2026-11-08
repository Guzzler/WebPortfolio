import mixpanelBrowser from "mixpanel-browser";

const disabledClient = { track: () => {} };

let client = disabledClient;

if (process.env.REACT_APP_MIXPANEL_TOKEN) {
  mixpanelBrowser.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
    autocapture: true,
    record_sessions_percent: 100,
  });
  client = mixpanelBrowser;
}

export const mixpanel = client;
export const track = (event, props) => client.track(event, props);
