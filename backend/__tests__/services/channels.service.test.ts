import channelsService from "../../src/services/channels.service";

describe("channels service", () => {
  describe("getChannels", () => {
    it("calls", () => {
      let called = false;
      const mockModel = {
        find: () => (called = true),
      } as any;
      channelsService(mockModel).getChannels();
      expect(called).toBeTruthy();
    });
  });

  describe("createChannel", () => {
    it.todo("");
  });
});
