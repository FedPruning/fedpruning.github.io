---
title: FedPruning
subtitle: Efficient Training Without Leaking Privacy Via Federated Dynamic Pruning
---

## About FedPruning

FedPruning is our open-source benchmark platform for federated pruning research. It currently integrates state-of-the-art algorithms including PruneFL, FedDST, FedTiny, and FedMef, with new methods being continuously added. The platform provides comprehensive tools, standardized evaluation protocols, and complete documentation to facilitate research and development in federated learning on edge devices.

## Research Focus

Our research tackles the challenge of enabling efficient neural network training across distributed devices while preserving data privacy. We focus on two interconnected areas:

**Federated Learning Challenges:**
- Non-IID data distributions and label imbalance across clients
- Communication bottlenecks and straggler problems
- Catastrophic forgetting during distributed training
- Resource constraints on edge devices (limited memory and computational power)

**Federated Dynamic Pruning Solutions:**

To address these challenges, we develop dynamic pruning techniques that reduce model complexity during federated training. Key problems we tackle include:
- Eliminating bias in initial pruning without centralized data
- Reducing resource costs during model adjustment phases
- Maintaining accuracy throughout pruning and growing cycles
- Achieving stable structure convergence with accurate parameter growth