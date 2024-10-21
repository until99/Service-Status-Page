// logChart.spec.js
import { describe, it, expect, beforeEach } from 'vitest';
import { initializeChart, chartInstance } from '../logChart';
import { JSDOM } from 'jsdom';
import Chart from 'chart.js/auto';

describe('initializeChart', () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div><canvas id="logChart"></canvas></div></body></html>');
    document = dom.window.document;
    global.document = document;
    global.Chart = Chart;
  });

  it('should create a chart with the correct data', () => {
    initializeChart();

    expect(chartInstance).toBeDefined();
    expect(chartInstance.config.type).toBe('line');
    expect(chartInstance.data.labels).toEqual(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']);
    expect(chartInstance.data.datasets[0].data).toEqual([5, 8, 2, 6, 3, 9, 4, 1, 7, 0, 10, 4]);
  });
});