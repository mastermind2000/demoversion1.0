import React from "react";

export default ({ name }) => <h1>Hello {name}!</h1>;
<Grid item xs={12}>
  <Condition when="role" is="student">
    <Field
      fullWidth
      name="policy"
      component={Select}
      label="Select Policies"
      formControlProps={{ fullWidth: true }}
    >
      <MenuItem value="Policy1">
        {" "}
        Jupyter Notebook of instance type ml.t2.medium for 60 mins duration
        Jupyter Notebook of instance type ml.t2.large for 30 mins duration
        Processing Job of instance ml.t3.medium with instance count 1 and
        additional volume for storage 1GB Training Job of instance ml.t3.medium
        with instance count 1 and additional volume for storage 1GB
      </MenuItem>
    </Field>
  </Condition>
</Grid>;
