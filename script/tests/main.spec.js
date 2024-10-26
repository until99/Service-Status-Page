// main.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadDataIntoTable, getPaginatedRecordList } from '../main'; // Ajuste o caminho conforme necessário
// import '../main'; // Ajuste o caminho conforme necessário

describe('getPaginatedRecordList', () => {
    let fetchMock;
    let loadDataIntoTableMock;
  
    beforeEach(() => {
      global.CURRENT_PAGE = 1;
      global.PER_PAGE = 25;
      global.RECORDS = [];
  
      fetchMock = vi.fn();
      global.fetch = fetchMock;
  
      loadDataIntoTableMock = vi.fn();
      global.loadDataIntoTable = loadDataIntoTableMock;
    });
  
    it('should fetch records and call loadDataIntoTable', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ items: [{ id: 1 }, { id: 2 }] }),
      };
      fetchMock.mockResolvedValue(mockResponse);
  
      await getPaginatedRecordList();
  
      expect(fetchMock).toHaveBeenCalledWith(
        'https://hell.pockethost.io/api/collections/MONITORING/records?page=0&perPage=25',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });
  
    it('should handle fetch errors', async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 500 });
  
      const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  
      await getPaginatedRecordList();
  
      expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching records:', 'HTTP error! status: 500');
  
      consoleErrorMock.mockRestore();
    });
  });


describe('loadDataIntoTable', () => {
  let RECORDS;

  beforeEach(() => {
    RECORDS = [
      { id: 1, DS_PAGENAME: 'Page1', DT_DATETIME: '2023-10-01 12:00:00Z', FG_UP: true, DS_ERROR: '' },
      { id: 2, DS_PAGENAME: 'Page2', DT_DATETIME: '2023-10-02 12:00:00Z', FG_UP: false, DS_ERROR: 'Error' }
    ];
    
    document.body.innerHTML = `
      <table id="logTable">
        <tbody></tbody>
      </table>
    `;
  });

  it('should populate the table with records', () => {
    loadDataIntoTable(RECORDS);
    const rows = document.querySelectorAll('#logTable tbody tr');
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('1');
    expect(firstRowCells[1].textContent).toBe('Page1');
    expect(firstRowCells[2].textContent).toBe('01/10/2023 09:00:00');
    expect(firstRowCells[3].textContent).toBe('True');
    expect(firstRowCells[4].textContent).toBe('No error');

    const secondRowCells = rows[1].querySelectorAll('td');
    expect(secondRowCells[0].textContent).toBe('2');
    expect(secondRowCells[1].textContent).toBe('Page2');
    expect(secondRowCells[2].textContent).toBe('02/10/2023 09:00:00');
    expect(secondRowCells[3].textContent).toBe('False');
    expect(secondRowCells[4].textContent).toBe('Error');
  });
});