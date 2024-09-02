import express from 'express';
import { beforeAll, describe, expect, test } from 'vitest';
import { app } from '../src/server'; 

export interface TaskDetails {
    title: string,
    description: string,
    priority?: "low" | "medium" | "high"
}

const makeRequest = async (id?: string, method?: string, body?: TaskDetails) => {
    const idParam = id ? `/${id}` : ""
    const res = await fetch('http://localhost:3000/tasks'+idParam,{ method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json'} })
    const status = res.status
    const data = await res.json() 
    return {status, data}        
}

describe('Express App', () => {
  beforeAll(() => {
    // Set up your Express app for testing
    app.listen(0); // listen on a random port
  });

  // Write your tests using Vitest
  test('GET /', async () => {
    const {status} = await makeRequest() ;
    expect(status).toBe(200);
  });

  test('POST /', async () => {
    const {status, data} = await makeRequest(undefined, "POST", {
    "title": "TASK1",
    "description": "TASK1"
    })
    expect(status).toBe(200);
    expect(data).toHaveProperty("title")
    expect(data).toHaveProperty("description")
  });

  test('GET /:id', async () => {
    const { data} = await makeRequest()
    const id = data[0].id
    const {status: status2, data:data2} = await makeRequest(id)
    expect(status2).toBe(200);
    expect(data2).toHaveProperty("title")
    expect(data2).toHaveProperty("description")
  });

  test('PUT /:id', async () => {
    const {data} = await makeRequest()
    const id = data[0].id
    console.log('ID', data.id)
    const {status: status2, data:data2} = await makeRequest(id, "PUT", {
    "title": "TASK14556",
    "description": "TASK144444"
    })
    expect(status2).toBe(200);
  });

  test('DELETE /:id', async () => {
    const {data} = await makeRequest()
    const id = data[0].id
    const {status: status2, data:data2} = await makeRequest(id, "DELETE")
    expect(status2).toBe(200);
  });
  
});