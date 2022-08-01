import { Meta, Story } from "@storybook/react";

import SnackBar from "components/common/SnackBar";

import { ISnackBarProps } from "types";

export default {
  component: SnackBar,
  title: "SnackBar",
} as Meta;

const Template: Story<ISnackBarProps> = (args) => <SnackBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "제품이 삭제되었습니다.",
};
