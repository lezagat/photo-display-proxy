import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 100,
  duration: "180s",
  rps: 1000,
};

export default function() {
  let res = http.get(`http://localhost:3003/api/restaurants/${Math.floor(Math.random() * (10000000 - 2)) + 1}/photos`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
}