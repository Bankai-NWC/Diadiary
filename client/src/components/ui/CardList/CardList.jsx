import { Skeleton, Stack, Typography } from '@mui/material';
import React, { lazy, Suspense } from 'react';

function CardList(props) {
  const EntriesCards = lazy(
    () =>
      new Promise(resolve => {
        setTimeout(() => resolve(import('../CustomCards/EntriesCards')), 1200);
      }),
  );

  if (!props.loading && props.entries.length === 0) {
    return (
      <Typography
        variant="h3"
        component="p"
        sx={{ fontWeight: 'bold', color: 'divider' }}
        textAlign="center"
      >
        Entries not found
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {props.entries.map(entry => (
        <React.Fragment key={entry._id}>
          <Suspense
            fallback={
              <Skeleton variant="rounded" width="100%" height="173px" />
            }
          >
            <EntriesCards
              id={entry._id}
              date={entry.date}
              time={entry.time}
              glucose={entry.glucose}
              breadUnits={entry.breadUnits}
              bolusInsulin={entry.bolusInsulin}
              basalInsulin={entry.basalInsulin}
              characterizedBy={entry.characterizedBy}
            />
          </Suspense>
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default React.memo(CardList);
