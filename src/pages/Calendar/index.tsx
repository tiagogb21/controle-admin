import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../styles/theme";
import { exclude, pleaseInsertNewTitle } from "../../data/constant";
import { IEvent, ISelected } from "../../interface/calendar.interface";

const Calendar = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected: ISelected | any) => {
    const title = prompt(pleaseInsertNewTitle);

    const { view, dateStr, startStr, endStr, allDay } = selected;

    const { calendar } = view;

    calendar.unselect();

    if (title) {
      calendar.addEvent({
        id: `${dateStr} - ${title}`,
        title,
        start: startStr,
        end: endStr,
        allDay: allDay,
      });
    }
  };

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(exclude(selected.event.title))
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Calendario"
        subtitle="Calendário - Página interativa"
      />

      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event: IEvent) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {
                        formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "dia anterior, proximo dia",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events: any) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "Evento - dia inteiro",
                date: "2022-10-07",
              },
              {
                id: "5123",
                title: "Evento - cronometrado",
                date: "2022-10-16",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
