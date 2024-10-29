"use client";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "/api";
const dataProviderClient = dataProvider(API_URL);

export default dataProviderClient;
