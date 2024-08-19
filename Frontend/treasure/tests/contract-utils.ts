import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ClubCreated,
  ClubInfoEvent,
  ProposalCreated,
  ProposalVoted
} from "../generated/Contract/Contract"

export function createClubCreatedEvent(
  clubId: BigInt,
  name: string,
  CID: string,
  creator: Address
): ClubCreated {
  let clubCreatedEvent = changetype<ClubCreated>(newMockEvent())

  clubCreatedEvent.parameters = new Array()

  clubCreatedEvent.parameters.push(
    new ethereum.EventParam("clubId", ethereum.Value.fromUnsignedBigInt(clubId))
  )
  clubCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  clubCreatedEvent.parameters.push(
    new ethereum.EventParam("CID", ethereum.Value.fromString(CID))
  )
  clubCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return clubCreatedEvent
}

export function createClubInfoEventEvent(
  id: BigInt,
  name: string,
  memberCounter: BigInt,
  proposalCounter: BigInt,
  pool: BigInt,
  CID: string
): ClubInfoEvent {
  let clubInfoEventEvent = changetype<ClubInfoEvent>(newMockEvent())

  clubInfoEventEvent.parameters = new Array()

  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam(
      "memberCounter",
      ethereum.Value.fromUnsignedBigInt(memberCounter)
    )
  )
  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam(
      "proposalCounter",
      ethereum.Value.fromUnsignedBigInt(proposalCounter)
    )
  )
  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromUnsignedBigInt(pool))
  )
  clubInfoEventEvent.parameters.push(
    new ethereum.EventParam("CID", ethereum.Value.fromString(CID))
  )

  return clubInfoEventEvent
}

export function createProposalCreatedEvent(
  clubId: BigInt,
  proposalId: BigInt,
  creator: Address,
  amount: BigInt,
  destination: Address,
  description: string,
  Cid: string
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("clubId", ethereum.Value.fromUnsignedBigInt(clubId))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "destination",
      ethereum.Value.fromAddress(destination)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("Cid", ethereum.Value.fromString(Cid))
  )

  return proposalCreatedEvent
}

export function createProposalVotedEvent(
  clubId: BigInt,
  proposalId: BigInt,
  voter: Address,
  vote: boolean
): ProposalVoted {
  let proposalVotedEvent = changetype<ProposalVoted>(newMockEvent())

  proposalVotedEvent.parameters = new Array()

  proposalVotedEvent.parameters.push(
    new ethereum.EventParam("clubId", ethereum.Value.fromUnsignedBigInt(clubId))
  )
  proposalVotedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  proposalVotedEvent.parameters.push(
    new ethereum.EventParam("vote", ethereum.Value.fromBoolean(vote))
  )

  return proposalVotedEvent
}
