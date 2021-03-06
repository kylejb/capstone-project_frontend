import FormModal from '../forms/FormModal';
import { Feed } from 'semantic-ui-react';

const JournalCardPart = ({ entry, entrySubmitHandler, entryRerenderHandler }) => {
    const date1 = new Date(entry.session_start_time),
          date2 = Date.now(),
          timeDiff = Math.abs(date2 - date1.getTime()),
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


  return (
    <>
      <Feed>
        <Feed.Event>
        <Feed.Label as={() => <FormModal
                                entry={entry}
                                entrySubmitHandler={entrySubmitHandler}
                                entryRerenderHandler={entryRerenderHandler}
                              />}
        />
        <Feed.Content>
            <Feed.Date content={`${diffDays} day(s) ago`}/>
            <Feed.Summary>
              <p>{entry.entry}</p>
            </Feed.Summary>
        </Feed.Content>
        </Feed.Event>
      </Feed>
    </>
  );
};

export default JournalCardPart;
