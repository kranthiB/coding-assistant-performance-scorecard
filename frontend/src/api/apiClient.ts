import axios from 'axios';
import { Tool, PerformanceData } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;

export const toolsApi = {
    getAllTools: async (): Promise<Tool[]> => {
        const response = await axios.get(`${API_BASE_URL}/tools`);
        return response.data;
    },

    getActiveTools: async (): Promise<Tool[]> => {
        const response = await axios.get(`${API_BASE_URL}/tools/active`);
        return response.data;
    },

    getToolById: async (id: string): Promise<Tool> => {
        const response = await axios.get(`${API_BASE_URL}/tools/${id}`);
        return response.data;
    },

    createTool: async (tool: Omit<Tool, 'id'>): Promise<Tool> => {
        const response = await axios.post(`${API_BASE_URL}/tools`, tool);
        return response.data;
    },

    updateTool: async (id: string, tool: Partial<Tool>): Promise<Tool> => {
        const response = await axios.put(`${API_BASE_URL}/tools/${id}`, tool);
        return response.data;
    },

    deleteTool: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/tools/${id}`);
    },
    
    performance: async(): Promise<PerformanceData[]> => {
        const response =  await axios.get(`${API_BASE_URL}/tools/performances`);
        return response.data;
    }
};
