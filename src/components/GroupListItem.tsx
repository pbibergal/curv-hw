import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ApproversGroup, Vote} from "../lib/entities";
import {GroupDetails} from "./GroupDetails";
import moment from 'moment';
import {AVATAR_COLORS} from "../lib/constants";

export const GroupListItem = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const voteSwitch = (vote: Vote, date: string) => {
    const a = moment(Date.now());
    const b = moment(date);
    const days = a.diff(b, 'day');

    switch (vote) {
      case Vote.Approved:
        return 'Vote approved';
      case Vote.Obstained:
        return `Obstained ${days} days ago`;
      case Vote.Pending:
        return 'Vote pending...';
      case Vote.Rejected:
        return 'Vote rejected';
      default:
    }
  };

  const getVotesCount = (group: ApproversGroup) => {
    let count = 0;
    group.approvers.map(item => {
      if (item.vote != Vote.Pending) {
        count++;
      }
    });

    return `${count} voted out of ${group.approvers.length}`;
  };

  return (
    <div>
      {
        props.item.approverGroups.map((group: ApproversGroup) => {
          return (
            <ExpansionPanel key={group.id} expanded={expanded === `panel${group.id}`}
                            onChange={handleChange(`panel${group.id}`)}>

              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <GroupDetails title={group.name} subtitle={getVotesCount(group)} isGroup={true}
                              color={AVATAR_COLORS[group.name.charCodeAt(0) % AVATAR_COLORS.length]}/>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{flexDirection: 'column', paddingLeft: '44px'}}>
                {
                  group.approvers.map(approver => {
                    return (
                      <div style={{width: '100%', marginBottom: 20}} key={approver.id}>
                        <GroupDetails title={approver.name}
                                      subtitle={voteSwitch(approver.vote, approver.voteDate)}
                                      isGroup={false}
                                      color={AVATAR_COLORS[approver.name.charCodeAt(0) % AVATAR_COLORS.length]}/>
                      </div>
                    )
                  })
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  )
};
