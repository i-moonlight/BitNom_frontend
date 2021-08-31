import { Card, CardContent, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import React from 'react';
import DarkTheme from '../../../../utilities/DarkTheme';
import { roadMap } from '../../utilities/welcome.data';

export default function RoadmapTab() {
  return (
    <div>
      {roadMap.map(({ year, quaters }) => {
        return (
          <div key={year}>
            <Timeline align='alternate'>
              {quaters.map(({ name, text, list }, index) => (
                <TimelineItem key={list[0]}>
                  <TimelineOppositeContent>
                    <RoadMapCard text={text} list={list} />
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent>
                    <YearQuaterText
                      year={year}
                      quater={name}
                      even={index % 2 == 0}
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        );
      })}
    </div>
  );
}

const RoadMapCard = ({ text, list }) => (
  <Card className='bg-theme br-2'>
    <DarkTheme>
      <CardContent>
        <Typography color='textPrimary'>{text}</Typography>
        <Typography color='textPrimary'>
          {list?.map(list => (
            <li className='mx-0' key={list}>
              <Typography>- {list}</Typography>
            </li>
          ))}
        </Typography>
      </CardContent>
    </DarkTheme>
  </Card>
);

const YearQuaterText = ({ even, quater, year }) => (
  <Typography>
    <span
      className={
        even ? 'text-primary fw-bold fs-2' : 'fs-6 text-secondary mx-2'
      }
    >
      {even ? quater : year}
    </span>
    <span
      className={
        !even ? 'text-primary fw-bold fs-2' : 'fs-6 text-secondary mx-2'
      }
    >
      {!even ? quater : year}
    </span>
  </Typography>
);
