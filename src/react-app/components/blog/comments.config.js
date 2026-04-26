// Cusdis comments configuration.
//
// Cusdis (https://cusdis.com) is a lightweight, open-source comment system.
// Visitors leave a name + comment (no login). Replies are threaded.
// Moderation happens from the dashboard at https://cusdis.com.
//
// To self-host or move dashboards later, change `host` and `appId` here.

const commentsConfig = {
  host: "https://cusdis.com",
  appId: "b1c3a665-6eba-4202-920f-841e4dd810bc",
};

export const isCommentsConfigured = () =>
  Boolean(commentsConfig.host && commentsConfig.appId);

export default commentsConfig;
