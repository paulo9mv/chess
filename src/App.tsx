
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
                          <div>
                              Current PGN: {todoStore.currentPgn}
                          </div>
                      </div>
                  </div>
              )
          }}

      </Observer>
  )
}

export default App