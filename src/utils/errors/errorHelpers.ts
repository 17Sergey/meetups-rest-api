export const errorHeplers = {
  getMessageFromUnkownError(error: unknown) {
    return error instanceof Error ? error.message : JSON.stringify(error);
  },
};
