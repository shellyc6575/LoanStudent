import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ClubCreated } from "../generated/schema"
import { ClubCreated as ClubCreatedEvent } from "../generated/Contract/Contract"
import { handleClubCreated } from "../src/contract"
import { createClubCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let clubId = BigInt.fromI32(234)
    let name = "Example string value"
    let CID = "Example string value"
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newClubCreatedEvent = createClubCreatedEvent(clubId, name, CID, creator)
    handleClubCreated(newClubCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClubCreated created and stored", () => {
    assert.entityCount("ClubCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClubCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "clubId",
      "234"
    )
    assert.fieldEquals(
      "ClubCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "ClubCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "CID",
      "Example string value"
    )
    assert.fieldEquals(
      "ClubCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
