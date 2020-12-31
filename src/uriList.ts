export const uri = {
  dev: {
    app: "http://localhost:5001/cra-timerec-1229/asia-northeast3/app",
  },
  prod: {
    app: "https://asia-northeast3-cra-timerec-1229.cloudfunctions.net/app",
  },
};

export const uriList =
  process.env.NODE_ENV === "production" ? uri.prod : uri.dev;

export default uriList;
