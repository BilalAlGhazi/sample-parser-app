import React, { Component } from "react";
import * as csvParser from "./utils/parseCsv";
import * as validators from "./utils/validators";
import "./App.css";

class App extends Component<{}, { csvFile: any, hasHeader: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      csvFile: null,
      hasHeader: false
    };
  }
  validateFileRow = (rowData: Array<any>): boolean => {
    return true;
  };

  parseFile = () => {
    let csvString: string = `
Investor's Eth Address,Sell Restriction Date,Buy Restriction Date,Another Date,Number of Tokens
0x592E80AD45c08aba6C5bBd2d5C5A097BDF35Dee1,01/01/2022,06/04/2024,01/01/2021,1000
0xd9f346Bf88cA2cb7e11B0106018DE80A0169764D,12/21/2030,12/21/2030,10/10/2024,5000
0xA1833Cd1a3e72335DE0b6945b5d83247F234d6e8,,,12/01/2025,250000
0x07889A89C6854bb4Ec445825E680255b17751192,,,12/01/2025,300`;

    const columns: Array<csvParser.Column> = [
      {
        name: "Investor's Eth Address",
        validators: [validators.isAddress, validators.isNotEmpty]
      },
      {
        name: "Sell Restriction Date",
        validators: [validators.isDate, validators.isNotEmpty]
      },
      {
        name: "Buy Restriction Date",
        validators: [validators.isDate, validators.isNotEmpty]
      },
      {
        name: "Another Date",
        validators: [validators.isDate, validators.isNotEmpty]
      },
      {
        name: "Number of Tokens",
        validators: [validators.isInt, validators.isNotEmpty]
      }
    ];

    const params: csvParser.Props = {
      data: this.state.csvFile,
      columns,
      header: this.state.hasHeader,
      callback: ({result, totalRows, errorRows, ignoredRows, validRows}) => {
        console.log(result);
        console.log("totalRows", totalRows);
        console.log("errorRows", errorRows);
        console.log("ignoredRows", ignoredRows);
        console.log("validRows", validRows);
      }
    };

    csvParser.parseCsv(params);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>CSV Parser Example</p>
          <p>File parse example</p>
          <p>
            <input
              onChange={e => {
                this.setState({ csvFile: e.target.files![0] });
              }}
              id="fileToParse"
              type="file"
            />
            <input
              name="hasHeader"
              type="checkbox"
              checked={this.state.hasHeader}
              onChange={(e) => this.setState({ hasHeader: e.target.checked })} />
          </p>
          <button onClick={this.parseFile}>Parse File</button>
        </header>
      </div>
    );
  }
}

export default App;
