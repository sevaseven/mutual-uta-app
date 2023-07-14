import { Box, Tab, Tabs } from "@material-ui/core";
import React from 'react'
import { useState } from "react";
import Paper from '@material-ui/core/Paper';


/**
 * @typedef {{
 *  title: string;
 *  puedeVerse?: boolean;
 *  tabDisabled?: boolean
 *  body: import("react").ReactNode;
 * }} TabSlot
 * 
 * @param {{
 *  scrollVariant: "fullWidth" | "scrollable" | "standard"
 *  tabs: TabSlot[]
 * }} 
 */
export const TabGeneric = ({
  scrollVariant = "fullWidth",
  tabs
}) => {
  const [tabIndex, setIndex] = useState(0)

  return (
    <>
      <Tabs variant={scrollVariant} component={Paper} onChange={(_, val) => setIndex(val)}>
        {
          tabs.map(({ title, tabDisabled = false }, idx) => (
            <Tab key={title} label={title} value={idx} disabled={tabDisabled} />
          ))
        }
      </Tabs>
      {
        tabs.map(({ title, body, puedeVerse = true }, idx) => {

          return puedeVerse && tabIndex === idx && (
            <div
              key={title}
              role="tabpanel"
              id={`simple-tabpanel-${idx}`}
              aria-labelledby={`simple-tab-${idx}`}
            >
              <Box p={3}>
                {body}
              </Box>
            </div>
          )
        })
      }
    </>
  )
}

