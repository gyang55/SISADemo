import {
    Typography,
    Button
} from "@mui/material";

export default function NoBuildingsDiv(){
    return(
        <div className="flex flex-col gap-10 h-full">
            <h2 className="mt-5 text-center">Your portfolio is currently empty, click below to add your first building! 🏠</h2>
            <div className="flex justify-center">
                <Button  color="primary" 
                    sx={{ borderRadius: 22 }} 
                    style={{
                        backgroundColor:
                            "#03045e",
                        width: "15%",
                        padding: 20
                    }}
                    variant="contained">
                    <Typography
                        className="font-medium"
                        style={{
                            color: "#FFFFFF",
                            textTransform:
                                "none",
                            fontWeight: "bold"
                        }}>
                        ADD BUILDING
                    </Typography>
                </Button>
            </div>
        </div>
    );
}