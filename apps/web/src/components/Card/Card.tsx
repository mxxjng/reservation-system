import { Button, Paper, Text, Title } from "@mantine/core";

import classes from "./Card.module.css";

interface Props {
  image: string;
  title: string;
  category: string;
}

const Card = ({ image, title, category }: Props) => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
};
export default Card;
