
import React, {useState} from "react";
import "./App.css"
import {useTodoStore} from "./context";
import {Observer} from "mobx-react-lite"
import {Button, TextField} from "@material-ui/core";
import { StoreI } from "./stores/game";

const App = () =>{

    const todoStore = useTodoStore() as StoreI

    const [value, setValue] = useState("")

  return(
      <Observer>

          {()=>{
              return(
                  <div className="App">
1. h4 d5 2. Nh3 e5 3. e4 Qg5 4. Bc4 Qxg2 5. Rg1 dxc4 6. Rxg2 /

                      1. e4 e5 2. Qh5 Nc6 3. Bc4 g6 4. Qxe5+ Be7
                      <div className="input-todo">
                          <TextField value={value} id="outlined-basic" label="Add Todo" 
                                  variant="outlined" 
                                  size="small" 
                                  onChange={(e)=>setValue(e.target.value.trim())}/>
                          <Button variant={"contained"} color={"primary"}
                                  onClick={()=>{
                                      if(value !== ""){
                                          todoStore.loadPgn(value)
                                      }
                              setValue("")
                          }}>Add</Button>
                          <Button disabled={!todoStore.currentPgn} variant={"contained"} color={"primary"}
                                  onClick={()=>{
                                      todoStore.startWorker()
                                      console.log(todoStore.game)
                                       const move = todoStore.game?.fen()
                                       todoStore.onEvaluateStart(move);
                          }}>Evaluate</Button>
                          <div>                              
                          </div>
                          <div>
                              Current PGN: {todoStore.currentPgn}
                          </div>
                          <div>
                              {todoStore.expectedMoves.map((i, index) => <div>{i}<br/></div>)}
                          </div>
                          <div>
                              {todoStore.history.map((i, index) => <div>{i}<br/></div>)}
                          </div>
                      </div>
                  </div>
              )
          }}

      </Observer>
  )
}

export default App