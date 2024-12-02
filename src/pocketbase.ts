import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_SUPER_DATABASE_URL);

export default pb;
