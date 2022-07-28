import React, { useEffect, useState, useCallback } from 'react';
import Inputfield from "./components/Inputfield/Inputfield"
import Selectfield from './components/Selectfield/Selectfield';
import Reptable from './components/Reptable/Reptable';
import "./App.css";

const App = () => {
  const [repList, setRepList] = useState([]);
  const [senatorList, setSenatorList] = useState([]);
  const [selectedState, setSelectedState] = useState('AK');
  const [selectedRep, setSelectedRep] = useState(undefined);
  const [selectMode, setSelectMode] = useState('Representatives');

  // couldn't find a state api quickly, so i just copied states into this file for the purposes of my time. 
  // I would probably rather grab these values from somewhere or store them elsewhere, but put them here for readability.
  const states = [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                  'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
                  'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
                  'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
                  'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ];
  
  const fetchReps = useCallback(
    async () => {
      await fetch(`http://localhost:3000/representatives/${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setRepList(data.results);
        })
    }, [selectedState]
  );

  const fetchSenators = useCallback(
    async () => {
      await fetch(`http://localhost:3000/senators/${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setSenatorList(data.results);
        })
    }, [selectedState]
  );

  useEffect(()=> {
    fetchReps().catch(console.error);
    fetchSenators().catch(console.error);
  }, [selectedState, selectMode, fetchReps, fetchSenators]);

  const handleSelect = (repName) => {
    let rep = repName;

    switch(selectMode){
      case 'Representatives':
        if(rep){
          setSelectedRep(repList.find(x => x.name === rep));
        }
        break;
      case 'Senators':
        if(rep){
          setSelectedRep(senatorList.find(x => x.name === rep));
        }
        break;
      default:
        return;
    }
  }

  return (
    <div className="container">
      <div className="headerText">Who's my Representative?</div>

      <div className="selectorsContainer">
        <Selectfield
          options={['Representatives', 'Senators']}
          label={'Select Mode'}
          changeHandler={(e)=> setSelectMode(e.target.value)}
        />
        <Selectfield
          options={states}
          label={'States'}
          changeHandler={(event) => setSelectedState(event.target.value)}
        />
      </div>

      <div className="infoGrid">
        <div className="repTable">
            <div>
              <span className="info-title-black">List / </span>
              <span className="info-title-blue">{selectMode}</span>
            </div>
            <div>
              <Reptable 
                data={selectMode === 'Representatives' ? repList : senatorList}
                clickHandler={handleSelect}
              />
            </div>
        </div>

        <div className = "info">
          <div>
            <span className="info-title-black">Info</span>
          </div>
          <div>
            <Inputfield type="text" placeholder="First Name" value={ selectedRep ? selectedRep.name.split(' ')[0] : ''}/>
            <Inputfield type="text" placeholder="Last Name" value={ selectedRep ? selectedRep.name.split(' ')[1] : ''}/>
            <Inputfield type="text" placeholder="District" value={ selectedRep ? selectedRep.district : '' }/>
            <Inputfield type="text" placeholder="Phone" value={ selectedRep ? selectedRep.phone : ''}/>
            <Inputfield type="text" placeholder="Office" value={ selectedRep ? selectedRep.office : ''}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
