import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import { AdminCardProps } from "interfaces/admin";
import { link } from "fs";

const AdminCard = ({ id, name, email, password, role }: AdminCardProps) => {
  return <Card></Card>;
};

export default AdminCard;
