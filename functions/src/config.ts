export const config_uri = {
  dev: {
    server: "http://localhost:5001/cra-timerec-1229/asia-northeast3/app",
    client: "http://localhost:8100",
  },
  prod: {
    server: "https://asia-northeast3-cra-timerec-1229.cloudfunctions.net/app",
    client: "https://cra-timerec-1229.web.app",
  },
};

export const config =
  process.env.NODE_ENV === "production" ? config_uri.prod : config_uri.dev;
