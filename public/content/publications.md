---
title: Publications
description: Research papers related to FedPruning and federated model compression
---

## Preprints

## Published

1. [NeurIPS 2025] Hong Huang, Hai Yang, Yuan Chen, Jiaxun Ye, Dapeng Wu. “FedRTS: Federated Robust Pruning via Combinatorial Thompson Sampling.” The Annual Conference on Neural Information Processing Systems (NeurIPS), 2025.

**Links**: [[PDF]](https://arxiv.org/pdf/2501.19122) [[Code]](https://github.com/Little0o0/FedRTS)

**Abstract**: Federated Learning (FL) enables collaborative model training across distributed clients without data sharing, but its high computational and communication demands strain resource-constrained devices. While existing methods use dynamic pruning to improve efficiency by periodically adjusting sparse model topologies while maintaining sparsity, these approaches suffer from issues such as greedy adjustments, unstable topologies, and communication inefficiency, resulting in less robust models and suboptimal performance under data heterogeneity and partial client availability. To address these challenges, we propose Federated Robust pruning via combinatorial Thompson Sampling (FedRTS), a novel framework designed to develop robust sparse models. FedRTS enhances robustness and performance through its Thompson Sampling-based Adjustment (TSAdj) mechanism, which uses probabilistic decisions informed by stable, farsighted information instead of deterministic decisions reliant on unstable and myopic information in previous methods. Extensive experiments demonstrate that FedRTS achieves state-of-the-art performance in computer vision and natural language processing tasks while reducing communication costs, particularly excelling in scenarios with heterogeneous data distributions and partial client participation. Our codes are available at: https://github.com/Little0o0/FedRTS

**BibTeX**:
```bibtex
@inproceedings{huang2025fedrts,
  title={Fedrts: Federated robust pruning via combinatorial thompson sampling},
  author={Huang, Hong and Yang, Hai and Chen, Yuan and Ye, Jiaxun and Wu, Dapeng},
  booktitle={[NeurIPS 2025] The Thirty-ninth Annual Conference on Neural Information Processing Systems, 2025.},
  year={2025}
}
```


2. Juntao Hu, Zhengjie Yang, Peng Wang, Guanyi Zhao, Hong Huang, Zhimin Zong, Dapeng Oliver Wu. "Federated Learning for Medical Image Analysis: Privacy-Preserving Paradigms and Clinical Challenges."Transactions on Artificial Intelligence 2025, 1 (1), 153–169.


**Links**: [[PDF]](https://www.sciltp.com/journals/tai/articles/2508001101)

**Abstract**: Federated Learning (FL) has emerged as a transformative paradigm in medical image analysis, addressing the critical challenges of data scarcity and patient privacy. By enabling collaborative model training across decentralized datasets without requiring data sharing, FL aligns with stringent privacy regulations like HIPAA and GDPR. However, existing surveys on FL for medical image analysis often focus narrowly on aspects like privacy and security or fail to categorize methods within a clear taxonomy. Our survey bridges these gaps by systematically organizing FL methodologies for medical image analysis around three core pillars: training, architecture, and unlearning. We emphasize the unique demands of the medical domain, such as handling heterogeneous imaging modalities and annotations. Unlike prior works, our survey strikes a balance between technical rigor and clinical practicality, covering approaches not only for privacy and security but also for accuracy and efficiency. By synthesizing insights from various studies, we provide a comprehensive roadmap to guide researchers and practitioners in leveraging FL’s potential to advance AI-driven healthcare.

**BibTeX**:
```bibtex
@article{hu2025federated,
  title={Federated Learning for Medical Image Analysis: Privacy-Preserving Paradigms and Clinical Challenges},
  author={Hu, Juntao and Yang, Zhengjie and Wang, Peng and Zhao, Guanyi and Huang, Hong and Zong, Zhimin and Wu, Dapeng Oliver},
  journal={Transactions on Artificial Intelligence},
  volume={1},
  number={1},
  pages={153--169},
  year={2025},
  publisher={Scilight Press}
}
```


3. [CVPR 2024] Hong Huang, Weiming Zhuang, Chen Chen, and Lingjuan Lyu. “FedMef: Towards Memory-efficient Federated Dynamic Pruning.” IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2024.

**Links**: [[PDF]](https://openaccess.thecvf.com/content/CVPR2024/papers/Huang_FedMef_Towards_Memory-efficient_Federated_Dynamic_Pruning_CVPR_2024_paper.pdf)

**Abstract**: Federated learning (FL) promotes decentralized training while prioritizing data confidentiality. However its application on resource-constrained devices is challenging due to the high demand for computation and memory resources to train deep learning models. Neural network pruning techniques such as dynamic pruning could enhance model efficiency but directly adopting them in FL still poses substantial challenges including post-pruning performance degradation high activation memory usage etc. To address these challenges we propose FedMef a novel and memory-efficient federated dynamic pruning framework. FedMef comprises two key components. First we introduce the budget-aware extrusion that maintains pruning efficiency while preserving post-pruning performance by salvaging crucial information from parameters marked for pruning within a given budget. Second we propose scaled activation pruning to effectively reduce activation memory footprints which is particularly beneficial for deploying FL to memory-limited devices. Extensive experiments demonstrate the effectiveness of our proposed FedMef. In particular it achieves a significant reduction of 28.5% in memory footprint compared to state-of-the-art methods while obtaining superior accuracy.

**BibTeX**:
```bibtex
@inproceedings{huang2024fedmef,
  title={Fedmef: Towards memory-efficient federated dynamic pruning},
  author={Huang, Hong and Zhuang, Weiming and Chen, Chen and Lyu, Lingjuan},
  booktitle={[CVPR 2024] Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={27548--27557},
  year={2024}
}
```

4. [ICDCS 2023] Hong Huang, Lan Zhang, Chaoyue Sun, Ruogu Fang, Xiaoyong Yuan, and Dapeng Wu. “Distributed Pruning Towards Tiny Neural Networks in Federated Learning.” IEEE 43rd International Conference on Distributed Computing Systems (ICDCS), 2023.

**Links**: [[PDF]](https://ieeexplore.ieee.org/document/10272556)

**Abstract**: Neural network pruning is an essential technique for reducing the size and complexity of deep neural networks, enabling large-scale models on devices with limited resources. However, existing pruning approaches heavily rely on training data for guiding the pruning strategies, making them ineffective for federated learning over distributed and confidential datasets. Additionally, the memory- and computation-intensive pruning process becomes infeasible for recourse-constrained devices in federated learning. To address these challenges, we propose FedTiny, a distributed pruning framework for federated learning that generates specialized tiny models for memory-and computing-constrained devices. We introduce two key modules in FedTiny to adaptively search coarse- and finer-pruned specialized models to fit deployment scenarios with sparse and cheap local computation. First, an adaptive batch normalization selection module is designed to mitigate biases in pruning caused by the heterogeneity of local data. Second, a lightweight progressive pruning module aims to finer prune the models under strict memory and computational budgets, allowing the pruning policy for each layer to be gradually determined rather than evaluating the overall model structure. The experimental results demonstrate the effectiveness of FedTiny, which outperforms state-of-the-art approaches, particularly when compressing deep models to extremely sparse tiny models. FedTiny achieves an accuracy improvement of 2.61% while significantly reducing the computational cost by 95.91% and the memory footprint by 94.01% compared to state-of-the-art methods.

**BibTeX**:
```bibtex
@inproceedings{huang2023distributed,
  title={Distributed pruning towards tiny neural networks in federated learning},
  author={Huang, Hong and Zhang, Lan and Sun, Chaoyue and Fang, Ruogu and Yuan, Xiaoyong and Wu, Dapeng},
  booktitle={[ICDCS 2023] 2023 IEEE 43rd International Conference on Distributed Computing Systems (ICDCS)},
  pages={190--201},
  year={2023},
  organization={IEEE}
}
```
