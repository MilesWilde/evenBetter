import React from 'react';
import PersonalStepper from './PersonalStepper'

// once a possibility_id as outcome is patched into the Bet table
// can then search the BetUser table for that possibility_id
// and select a user from that
// axios.patch('/bets/bet_id', outcome_id)

const PersonalBet = () => (
  <div>
      <PersonalStepper />
  </div>
);

export default PersonalBet;