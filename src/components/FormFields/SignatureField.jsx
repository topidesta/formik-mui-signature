import React, { useState, useRef } from "react";
import { Grid, Box, Button, Modal, TextField } from "@material-ui/core";
import SignatureCanvas from "react-signature-canvas";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const styleDua = {
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  width: "100%"
};

const styleCanvas = () => ({
  sign: `
    width: 100%;
    height: 100%;
    border: "1px solid black";
    minheight: "500xp";
  `
});

const SignatureField = ({
  field,
  form: { touched, errors },
  name,
  label,
  isError,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();

  const [imageURL, setImageURL] = useState("");

  const simpan = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <>
      <Grid item justifyContent="center">
        <Button variant="outlined" onClick={handleOpen}>
          Buka Lembar Tanda Tangan.
        </Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={styleDua}>
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                width: 320,
                height: 200,
                className: styleCanvas.sign
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pt={2}
          >
            <Button onClick={clear}>Ulangi</Button>
            <Button onClick={simpan}>Simpan</Button>
            <Button onClick={handleClose}>Keluar</Button>
          </Box>
        </Box>
      </Modal>

      {imageURL && (
        <Box
          sx={{
            display: { xs: "block", md: "block", xl: "block", sm: "block" }
          }}
        >
          <TextField
            name="ttd"
            label="Tanda Tangan"
            value={imageURL.split(",")[1]}
            fullWidth
          />
        </Box>
      )}
      {/* {isError && <FormHelperText>{errors[field.name]}</FormHelperText>} */}
    </>
  );
};

export default SignatureField;
