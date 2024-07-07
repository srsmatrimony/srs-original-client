import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function BasicDatePicker(props) {
   const dob=props.dob;
   const setdob=props.setdob;

   // const [selectedDate, handleDateChange] = useState(new Date());

   return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <DatePicker
            autoOk
            label=""
            clearable
            format="dd/MM/yyyy"
            disableFuture
            value={dob}
            onChange={setdob}
         />
      </MuiPickersUtilsProvider>
   );
}

export default BasicDatePicker;