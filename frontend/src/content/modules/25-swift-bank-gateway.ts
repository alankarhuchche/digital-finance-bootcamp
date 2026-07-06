import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'swift-bank-gateway',
  number: '25',
  title: 'Inside a bank SWIFT gateway',
  summary: 'The SWIFT estate is a controlled financial messaging layer — not a send/receive pipe, not a settlement rail, and not a liquidity manager. Understanding its six roles clarifies what it does, what it does not do, and why it is treated as a high-impact control surface.',
  ready: false,
  updatedAt: '2026-07-06',
  changeType: 'new',
  changeSummary: 'New concept page: SWIFT estate as controlled messaging layer. Operating-map visual with roles 1 and 2 active.',
  blocks: [
    {
      kind: 'text',
      body: `The SWIFT estate is where financial messages become controlled, routed, evidenced and reportable bank obligations.\n\nIn a large bank, the estate is more than a SWIFT connection. It operates as a controlled channel for corporates and financial institutions, a connector to domestic schemes and market infrastructures, a routing and transformation layer, a sanctions and repair orchestration point, a gpi and status processor, a contingency entry route, a secure-zone control surface, and a raw-message evidence source for reporting, reconciliation, audit and legal retention.`,
    },
    {
      kind: 'swift-gateway-visual',
    },
    {
      kind: 'stack',
      heading: 'The six roles of a bank SWIFT estate',
      data: [
        {
          id: 'channel-access',
          number: '01',
          label: 'Channel and secure access layer',
          colorClass: 's1',
          detail: `Corporates and financial institutions reach the bank's SWIFT estate through controlled access channels. The secure boundary authenticates, signs and entitles every message before it enters the estate. SWIFT may provide secure access to external services and portals — it does not manage bank liquidity.`,
          examples: 'Access types: SCORE · MA-CUG · Secure web access · API channel · Scheme portal',
        },
        {
          id: 'scheme-connector',
          number: '02',
          label: 'Scheme and market-infrastructure connector',
          colorClass: 's2',
          detail: `The estate carries messages to and from a range of schemes and market infrastructures — domestic, European and cross-border. Routing depends on BIC memberships, NSP relationships and scheme connectivity. Access models and participant eligibility differ by scheme. SWIFT is the messaging layer; settlement occurs through RTGS, nostro/vostro balances, local clearing or the relevant market mechanism.`,
          examples: 'Examples of scheme and infrastructure connectivity: CHAPS · Bacs · TARGET services · SEPA-related services · CLS · CREST',
        },
        {
          id: 'routing-transform',
          number: '03',
          label: 'Message-family routing and transformation',
          colorClass: 's3',
          detail: `Messages are classified by family, format and purpose. MT families and ISO 20022 families coexist during migration periods. The estate may transform between formats, preserve or enrich UETR and service data where relevant, apply priorities, enrich structured fields and route by BIC, service and scheme membership. Transformation preserves the meaning and obligation of the instruction — it is not a conversion that changes the settlement instruction.`,
          examples: 'MT families: 1xx · 2xx · 3xx · 5xx · 7xx · 9xx · ISO 20022 families: pacs · camt · pain · sese · seev',
        },
        {
          id: 'controls-repair',
          number: '04',
          label: 'Controls, sanctions and repair orchestrator',
          colorClass: 's4',
          detail: `Every message passes through validation, duplicate checks and controls — including sanctions and financial crime screening — before release. The estate orchestrates specialist control applications; it does not own every control. A payment can be stopped, held, repaired, re-routed or rejected. An ACK/NACK from the network confirms message processing status, not settlement finality. A gpi event updates tracking state, not settlement state.`,
          examples: 'Control steps: Validation · Duplicate check · Sanctions screening · Financial crime · Repair queue · Release / hold / reject',
        },
        {
          id: 'contingency',
          number: '05',
          label: 'Contingency entry route',
          colorClass: 's5',
          detail: `When upstream channels, payment platforms or workflow tools are impaired, the estate can accept controlled contingency payment entry. Contingency may bypass a failed upstream system, but must not bypass approval, entitlement, segregation of duties, sanctions controls, accounting, settlement, reconciliation, audit evidence or retention. This is why the estate is treated as a high-impact control surface.`,
          examples: 'Controls that remain mandatory under contingency: Approval · Entitlement · Segregation of duties · Sanctions · Accounting · Audit',
        },
        {
          id: 'evidence-archive',
          number: '06',
          label: 'Evidence, archive and reporting source',
          colorClass: 's6',
          detail: `The estate may hold or expose raw inbound and outbound messages, ACK/NACK events, repair history, routing decisions, transformation events, duplicate-check outcomes, sanctions and hold states, and archive records. These records support operational MI, audit, investigation, regulatory query response and legal archive search. Raw message data is evidence — it is not accounting truth, settlement truth or customer-balance truth. Reconciliation with ledgers and settlement records is required.`,
          examples: 'Evidence types: Raw messages · ACK/NACK history · Repair history · gpi/UETR tracking · Sanctions states · Archive records',
        },
      ],
      note: `These six roles are not mutually exclusive — a single message flow will typically involve several of them. The roles are a framing device to show the estate\'s breadth, not a description of discrete systems.`,
    },
    {
      kind: 'matrix',
      heading: 'What SWIFT does and does not do',
      data: {
        columns: ['Common framing', 'Accurate framing'],
        items: [
          {
            id: 'settlement',
            label: 'Settlement',
            color: '#E8A33D',
            values: [
              'SWIFT moves money between banks.',
              'SWIFT carries financial messages. Settlement occurs through RTGS, correspondent banking, nostro/vostro balances, local clearing or market infrastructure — not through SWIFT.',
            ],
          },
          {
            id: 'ack-finality',
            label: 'ACK and finality',
            color: '#5FB3A3',
            values: [
              'Receiving an ACK means the payment has settled.',
              'An ACK confirms message processing status on the network. Settlement is a separate event, using a separate mechanism, on a separate timeline.',
            ],
          },
          {
            id: 'gpi-finality',
            label: 'gpi and status',
            color: '#7AA7D9',
            values: [
              'gpi tracker status confirms the payment is final and irrevocable.',
              'gpi/UETR tracks message status through the correspondent chain. It is tracking evidence — not settlement finality.',
            ],
          },
          {
            id: 'iso20022-speed',
            label: 'ISO 20022 and speed',
            color: '#C792E8',
            values: [
              'ISO 20022 / CBPR+ makes cross-border payments instant.',
              'ISO 20022 / CBPR+ enriches message data with structured fields and UETRs. It does not remove correspondent settlement, nostro/vostro funding requirements or bilateral clearing.',
            ],
          },
          {
            id: 'contingency-controls',
            label: 'Contingency and controls',
            color: '#9D7EC9',
            values: [
              'Contingency entry bypasses controls to restore operations.',
              'Contingency entry bypasses a failed upstream system. Approval, entitlement, segregation of duties, sanctions screening, accounting, settlement, reconciliation, audit evidence and retention still apply.',
            ],
          },
          {
            id: 'message-data',
            label: 'Message data',
            color: '#E86B5F',
            values: [
              'The SWIFT message store is the source of truth for payment obligations.',
              'Raw SWIFT message data is evidence. It must be reconciled with ledgers and settlement records. It is not accounting truth.',
            ],
          },
          {
            id: 'liquidity',
            label: 'Liquidity management',
            color: '#6B8E9D',
            values: [
              'The SWIFT estate manages the bank\'s liquidity.',
              'The estate provides secure channels and connectivity, including access to some liquidity-related services. Bank liquidity is managed through treasury operations, not through the SWIFT estate.',
            ],
          },
          {
            id: 'scope',
            label: 'Scope',
            color: '#A0A896',
            values: [
              'SWIFT is for international correspondent payments.',
              'The SWIFT estate supports international correspondent flows, domestic scheme connectivity (where applicable), European services, market-infrastructure messaging, corporate channels and treasury flows.',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Controls: the estate as orchestrator',
      body: `The SWIFT estate orchestrates controls — it does not own every control in the chain. Sanctions and financial crime screening, for example, are typically executed by specialist applications that integrate into the estate's processing flow. Failure or bypass in a specialist control application is not the same as a failure in the SWIFT estate itself. The distinction matters for accountability, audit and system design.\n\nThe estate's role is to route messages through the required controls, capture outcomes, apply holds or repair queues where needed, and release cleared messages to their destination. The controls operate before release.`,
    },
    {
      kind: 'text',
      heading: 'Contingency entry: controlled bypass',
      body: `Contingency payment entry allows operators to submit payment instructions directly into the SWIFT estate when upstream systems — payment platforms, workflow tools, straight-through processing channels — are unavailable or impaired.\n\nThis capability is valuable and high-risk in equal measure. Contingency bypasses the automation, validation and workflow controls of the upstream system. What it must not bypass are the fundamental controls that apply to every payment regardless of entry route: approval, entitlement checks, segregation of duties, sanctions screening, accounting, settlement, reconciliation, audit trail and retention. Each of these must remain in force.\n\nThe estate is treated as a high-impact control surface precisely because it can accept payment instructions directly when other systems cannot. The access controls, entitlement controls, monitoring and security applied to the estate are correspondingly stringent.`,
    },
    {
      kind: 'text',
      heading: 'Evidence, archive and reporting',
      body: `The SWIFT estate handles or has visibility of raw inbound and outbound messages, ACK/NACK events, repair and hold history, routing decisions, transformation records, duplicate-check outcomes, and sanctions-related states. These records serve a range of purposes: operational MI, audit investigation, regulatory query response, legal archive search, scheme reconciliation and migration analysis.\n\nRaw SWIFT message data is not a substitute for accounting. A raw MT103 or pacs.008 records an instruction and its processing history. It does not record whether the receiving bank credited the beneficiary, whether the nostro account was funded, or whether the obligation settled. These require reconciliation with the accounting ledger, the settlement record and, where applicable, the scheme statement.\n\nThis distinction matters operationally. The SWIFT estate may confirm that an instruction was sent and acknowledged — the accounting and settlement systems are the record of whether the obligation was discharged.`,
    },
    {
      kind: 'text',
      heading: 'Resilience and security',
      body: `The SWIFT estate is designed for high availability. Message queuing, replay capability and failover arrangements help protect against message loss during outages. Deduplication controls prevent double-processing when messages are retried.\n\nSWIFT messaging controls are designed to protect message integrity, authenticity and claimed origin. SWIFT's Customer Security Programme establishes a baseline of mandatory and recommended controls for connected institutions. These are architectural and programme-level concepts — this reference does not cover implementation patterns, signing approaches, HSM configurations or network design specifics.`,
    },
    {
      kind: 'quiz',
      heading: 'Check your understanding',
      data: {
        questions: [
          {
            question: 'What does a SWIFT ACK confirm?',
            options: [
              'The payment has settled and the beneficiary has been credited.',
              'The receiving bank has received funds in its nostro account.',
              'The message has been processed by the SWIFT network.',
              'Sanctions screening has cleared the instruction for release.',
            ],
            correctIndex: 2,
            explanation: 'An ACK confirms message processing status on the SWIFT network. It is not confirmation of settlement, nostro funding, beneficiary credit or sanctions clearance. Settlement and credit are subsequent events on separate timelines.',
          },
          {
            question: 'A payment message passes through the SWIFT estate\'s controls layer. Which statement best describes how sanctions screening works?',
            options: [
              'The SWIFT estate owns and executes all sanctions decisions directly.',
              'The estate routes messages through specialist sanctions applications that own the screening decision.',
              'Sanctions screening is optional and only applied to high-value payments.',
              'Sanctions screening happens after the ACK is received from the network.',
            ],
            correctIndex: 1,
            explanation: 'The estate orchestrates controls — it routes messages through specialist applications that own specific screening and decision-making. The estate does not own every control in the chain. This distinction matters for accountability, audit and system design.',
          },
          {
            question: 'A bank\'s SWIFT message archive holds records of instructions sent and received over six months. What can these records reliably establish?',
            options: [
              'The settlement status of each instruction.',
              'The customer account balances at the time of each instruction.',
              'The instruction history, routing, processing events and acknowledgement status for each message.',
              'Whether nostro accounts were funded for each payment.',
            ],
            correctIndex: 2,
            explanation: 'Raw SWIFT message records establish what was instructed, how it was routed, what processing events occurred and what acknowledgements were received. Settlement status, account balances and nostro funding require the accounting ledger and settlement records — not the message archive.',
          },
          {
            question: 'A payment platform is unavailable. Operators submit payment instructions directly into the SWIFT estate under contingency procedures. Which statement is most accurate?',
            options: [
              'Contingency entry is lower-risk because the estate handles all controls automatically.',
              'Approval, entitlement and sanctions controls are suspended to restore operations quickly.',
              'All standard controls — approval, entitlement, sanctions, accounting, reconciliation and audit — must remain in force for contingency entries.',
              'Contingency entries are managed directly by the SWIFT network without bank intervention.',
            ],
            correctIndex: 2,
            explanation: 'Contingency entry bypasses a failed upstream system, not the controls. Approval, entitlement, segregation of duties, sanctions screening, accounting, settlement, reconciliation, audit evidence and retention all remain mandatory. The estate is treated as a high-impact control surface because it accepts payment instructions directly.',
          },
        ],
      },
    },
  ],
};

export default content;
