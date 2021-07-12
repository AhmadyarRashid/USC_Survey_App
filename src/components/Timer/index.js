import React from 'react';
import {View, Text} from 'react-native';
import Timer from 'react-compound-timer';

function TimerComponent({value}) {
  return (
      <Timer
          initialTime={value * 1000}
          timeToUpdate={10}
          checkpoints={[
            {
              time: 0,
              callback: () => {},
            },
          ]}
      >
        <Text>
          <Text>
            <Timer.Hours/>:
          </Text>
          <Text>
            <Timer.Minutes/>:
          </Text>
          <Text>
            <Timer.Seconds/>
          </Text>
        </Text>
      </Timer>
  );
}

export default TimerComponent;
